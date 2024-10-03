// Songs.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Select,
  Upload,
  message,
  Popover,
} from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  AudioOutlined,
  FileOutlined,
  FolderOpenOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {axiosInstance, baseURL} from '../axios';
import Player from './Player'; // Import the new Player component

const { Option } = Select;

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [audio, setAudio] = useState(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [form] = Form.useForm();
  const [deletingSongId, setDeletingSongId] = useState(null); // State to track song to delete

  // Fetch songs and albums
  const fetchSongs = async () => {
    console.log(axiosInstance);
    const response = await axiosInstance.get('/songs');
    setFilteredSongs(response.data);
  };

  const fetchAlbums = async () => {
    const response = await axiosInstance.get('/albums');
    setAlbums(response.data);
  };

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  // Handle adding a new song
  const handleAddSong = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('album_id', values.album_id);
    formData.append('audio', selectedFile);

    try {
      await axiosInstance.post('/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Song added successfully!');
      fetchSongs(); // Refresh song list
      setIsModalVisible(false);
      form.resetFields();
      setSelectedFile(null); // Reset file selection
    } catch (error) {
      console.error('Error uploading song:', error);
      message.error('Failed to upload the song.');
    }
  };

  // Play the selected song
  const playSong = (index) => {
    const song = filteredSongs[index];
    if (song) {
      audio.src = `${baseURL}/${song.file_path}`;
      audio.play();
      setIsPlaying(true);
      setCurrentSongIndex(index);
    }
  };

  // Handle next song
  const handleNext = () => {
    if (currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % filteredSongs.length;
    playSong(nextIndex);
  };

  // Handle previous song
  const handlePrevious = () => {
    if (currentSongIndex === null) return;
    const prevIndex =
      (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    playSong(prevIndex);
  };

  // Shuffle songs
  const handleShuffle = () => {
    const shuffledSongs = [...filteredSongs].sort(() => Math.random() - 0.5);
    setFilteredSongs(shuffledSongs);
    setCurrentSongIndex(0); // Optionally reset to first song
  };

  // Handle song deletion
  const handleDeleteSong = async () => {
    if (deletingSongId) {
      try {
        await axiosInstance.delete(`/songs/${deletingSongId}`);
        message.success('Song deleted successfully!');
        fetchSongs(); // Refresh song list
      } catch (error) {
        console.error('Error deleting song:', error);
        message.error('Failed to delete the song.');
      }
      setDeletingSongId(null); // Reset deletion id
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search by song title"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Song
        </Button>
      </div>

      {/* Songs Table */}
      <Table
        dataSource={filteredSongs.filter((song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Album',
            dataIndex: 'album_title',
            key: 'album_title',
          },
          {
            title: 'Artist',
            dataIndex: 'artist_name',
            key: 'artist_name',
            render: (text, record) => (
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full"
                  src={record.artist_pic}
                  alt={record.artist_name}
                />
                {record.artist_name}
              </div>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
              <div>
                <Button
                  type="link"
                  onClick={() => playSong(index)}
                >
                  Play
                </Button>
                <Popover
                  content={
                    <div>
                      <p>Are you sure you want to delete this song?</p>
                      <Button type="primary" onClick={handleDeleteSong}>
                        Yes
                      </Button>
                      <Button onClick={() => setDeletingSongId(null)}>
                        No
                      </Button>
                    </div>
                  }
                  title="Delete Confirmation"
                  trigger="click"
                  onClick={() => setDeletingSongId(record.id)} // Set the song id for deletion
                >
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Popover>
              </div>
            ),
          },
        ]}
        rowKey="id"
        className="dark:text-white"
      />

      {/* Modal for Adding Song */}
      <Modal
        title="Add Song"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedFile(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleAddSong}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Song Title"
            rules={[{ required: true, message: 'Please enter the song title' }]}
          >
            <Input prefix={<AudioOutlined />} placeholder="Enter song title" />
          </Form.Item>
          <Form.Item
            name="album_id"
            label="Album"
            rules={[{ required: true, message: 'Please select an album' }]}
          >
            <Select placeholder="Select an album" prefix={<FolderOpenOutlined />}>
              {albums.map((album) => (
                <Option key={album.id} value={album.id}>
                  {album.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Audio File"
            rules={[{ required: true, message: 'Please upload an audio file' }]}
          >
            <Upload onChange={(info) => setSelectedFile(info.file.originFileObj)} accept="audio/*" showUploadList={false}>
              <Button icon={<FileOutlined />}>Select Audio</Button>
              {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Player Component */}
      {currentSongIndex !== null && (
        <Player
          currentSong={filteredSongs[currentSongIndex]}
          isPlaying={isPlaying}
          onPlayPause={() => {
            if (isPlaying) {
              audio.pause();
              setIsPlaying(false);
            } else {
              audio.play();
              setIsPlaying(true);
            }
          }}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onShuffle={handleShuffle}
        />
      )}
    </div>
  );
};

export default Songs;

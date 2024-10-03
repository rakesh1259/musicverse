import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select, Popconfirm } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  PictureOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {axiosInstance} from "../axios";

const { Option } = Select;

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Fetch albums
  const fetchAlbums = async () => {
    const response = await axiosInstance.get("/albums");
    setAlbums(response.data);
    setFilteredAlbums(response.data); // Initialize filtered albums
  };

  // Fetch artists for artist dropdown
  const fetchArtists = async () => {
    const response = await axiosInstance.get("/artists");
    setArtists(response.data);
  };

  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

  // Handle adding a new album
  const handleAddAlbum = async (values) => {
    await axiosInstance.post("/albums", values);
    fetchAlbums();
    setIsModalVisible(false);
  };

  // Handle deleting an album
  const handleDeleteAlbum = async (id) => {
    await axiosInstance.delete(`/albums/${id}`);
    fetchAlbums();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterAlbums(selectedArtist, selectedYear, value);
  };

  // Handle filtering by artist
  const handleArtistFilter = (value) => {
    setSelectedArtist(value);
    filterAlbums(value, selectedYear, searchTerm);
  };

  // Handle filtering by release year
  const handleYearFilter = (value) => {
    setSelectedYear(value);
    filterAlbums(selectedArtist, value, searchTerm);
  };

  // Filter albums based on search term and selected filters
  const filterAlbums = (artist, year, search) => {
    let filtered = albums;

    if (artist) {
      filtered = filtered.filter((album) => album.artist_id === artist);
    }

    if (year) {
      filtered = filtered.filter((album) => album.release_year === year);
    }

    if (search) {
      filtered = filtered.filter((album) =>
        album.title.toLowerCase().includes(search)
      );
    }

    setFilteredAlbums(filtered);
  };

  return (
    <div>
      {/* Header with Search Bar and Button */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by album title"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "300px" }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Album
        </Button>
      </div>

      {/* Album Table */}
      <Table
        dataSource={filteredAlbums}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
            filters: filteredAlbums.map((album) => ({
              text: album.title,
              value: album.title,
            })),
            onFilter: (value, record) => record.title.includes(value),
            render: (text, record) => (
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full"
                  src={record.image_url || '/1.gif'}
                  alt={record.title}
                />
                {record.title}
              </div>
            ),
          },
          {
            title: "Release Year",
            dataIndex: "release_year",
            key: "release_year",
            filters: Array.from(
              new Set(filteredAlbums.map((album) => album.release_year))
            ).map((year) => ({
              text: year,
              value: year,
            })),
            onFilter: (value, record) => record.release_year === value,
          },
          {
            title: "Artist",
            dataIndex: "artist_name",
            key: "artist",
            render: (text, record) => (
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full"
                  src={record.artist_pic}
                  alt={record.artist_name}
                />{" "}
                {record.artist_name}
              </div>
            ),
            filters: artists.map((artist) => ({
              text: artist.name,
              value: artist.id,
            })),
            onFilter: (value, record) => record.artist_id === value,
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Popconfirm
                title="Are you sure you want to delete this album?"
                onConfirm={() => handleDeleteAlbum(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ),
          },
        ]}
        rowKey="id"
        className="text-white"
      />

      {/* Modal for Adding Album */}
      <Modal
        title="Add New Album"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          onFinish={handleAddAlbum}
          layout="vertical"
          className="space-y-4"
        >
          {/* Title Field */}
          <Form.Item
            name="title"
            label="Album Title"
            rules={[{ required: true, message: "Please enter the album title" }]}
          >
            <Input
              prefix={<AppstoreOutlined />}
              placeholder="Enter album title"
            />
          </Form.Item>

          {/* Release Year Field */}
          <Form.Item
            name="release_year"
            label="Release Year"
            rules={[{ required: true, message: "Please enter the release year" }]}
          >
            <Input
              prefix={<CalendarOutlined />}
              placeholder="Enter release year"
            />
          </Form.Item>

          {/* Artist Field */}
          <Form.Item
            name="artist_id"
            label="Artist"
            rules={[{ required: true, message: "Please select an artist" }]}
          >
            <Select
              placeholder="Select an artist"
              prefix={<UserOutlined />}
              suffixIcon={<UserOutlined />}
              onChange={handleArtistFilter}
            >
              {artists.map((artist) => (
                <Option key={artist.id} value={artist.id}>
                  {artist.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Image URL Field */}
          <Form.Item name="image_url" label="Album Cover Image URL">
            <Input
              prefix={<PictureOutlined />}
              placeholder="Enter image URL (optional)"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Albums;

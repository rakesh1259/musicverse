import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, Form, Popconfirm, Select } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  PictureOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import {axiosInstance} from "./../axios";

const { Option } = Select;

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch artists from API
  const fetchArtists = async () => {
    const response = await axiosInstance.get("/artists");
    setArtists(response.data);
    setFilteredArtists(response.data); // Initialize filtered artists
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Handle adding a new artist
  const handleAddArtist = async (values) => {
    await axiosInstance.post("/artists", values);
    fetchArtists();
    setIsModalVisible(false);
  };

  // Handle deleting an artist
  const handleDeleteArtist = async (id) => {
    await axiosInstance.delete(`/artists/${id}`);
    fetchArtists();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterArtists(selectedGenre, value);
  };

  // Handle filtering by genre
  const handleGenreFilter = (value) => {
    setSelectedGenre(value);
    filterArtists(value, searchTerm);
  };

  // Filter artists based on search term and selected genre
  const filterArtists = (genre, search) => {
    let filtered = artists;

    if (genre) {
      filtered = filtered.filter((artist) => artist.genre === genre);
    }

    if (search) {
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(search)
      );
    }

    setFilteredArtists(filtered);
  };

  // Get unique genres for filter options
  const uniqueGenres = [...new Set(artists.map((artist) => artist.genre))];

  return (
    <div>
      {/* Header with Search Bar and Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex justify-between items-center mb-4 gap-2">
          <Input
            placeholder="Search by artist name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "300px" }}
          />
          {/* Genre Filter */}
          <div className="">
            <Select
              placeholder="Filter by genre"
              onChange={handleGenreFilter}
              style={{ width: "200px" }}
            >
              <Option value={null}>All Genres</Option>
              {uniqueGenres.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Artist
        </Button>
      </div>

      {/* Artists Table */}
      <Table
        dataSource={filteredArtists}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Genre", dataIndex: "genre", key: "genre" },
          {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => (
              <img
                className="w-9 h-9 rounded-full"
                src={record.image_url}
                alt={record.name}
              />
            ),
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Popconfirm
                title="Are you sure you want to delete this artist?"
                onConfirm={() => handleDeleteArtist(record.id)}
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

      {/* Modal for Adding Artist */}
      <Modal
        title="Add New Artist"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          onFinish={handleAddArtist}
          layout="vertical"
          className="space-y-4"
        >
          {/* Name Field */}
          <Form.Item
            name="name"
            label="Artist Name"
            rules={[
              { required: true, message: "Please enter the artist name" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter artist name" />
          </Form.Item>

          {/* Genre Field */}
          <Form.Item
            name="genre"
            label="Genre"
            rules={[{ required: true, message: "Please enter the genre" }]}
          >
            <Input prefix={<RightCircleOutlined />} placeholder="Enter genre" />
          </Form.Item>

          {/* Image URL Field */}
          <Form.Item name="image_url" label="Image URL">
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

export default Artists;

import axios from "../axios";
const roomServices = {
  async createRoom({ id, files, data }) {
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("isLayout", data.isLayout);
    formData.append("number", data.number);
    formData.append("size", data.size);
    formData.append("price", data.price);
    formData.append("options", data.options);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.post(
        `/api/v1/board-house/room/create/${id}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },
  async getAllRoomsByAdminId(adminId) {
    console.log("abc");
    const res = await axios.get(
      `/api/v1/board-house/all-rooms?adminId=${adminId}`
    );
    return res.data;
  },

  async deleteRoom(roomId, imgsToDelete) {
    const res = await axios.post(
      `/api/v1/board-house/room/delete/${roomId}`,
      imgsToDelete
    );
    return res.data;
  },

  async updateRoom(roomId, dataRoom, fileImgs) {
    let formData = new FormData();
    formData.append("description", dataRoom.description);
    formData.append("isLayout", dataRoom.isLayout);
    formData.append("number", dataRoom.number);
    formData.append("size", dataRoom.size);
    formData.append("price", dataRoom.price);
    formData.append("options", dataRoom.options);
    formData.append("boardHouseId", dataRoom.boardHouseId);

    // img to delete
    const imgToDelete = dataRoom.images
      .filter((url) => !dataRoom.originalImage.includes(url))
      .concat(
        dataRoom.originalImage.filter((url) => !dataRoom.images.includes(url))
      )
      .filter((url) => url.includes("https"));

    formData.append("imgToDelete", imgToDelete);

    // img to upload
    for (let i = 0; i < fileImgs.length; i++) {
      formData.append("images", fileImgs[i]);
    }
    try {
      const res = await axios.patch(
        `/api/v1/board-house/room/update/${roomId}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },
};

export default roomServices;

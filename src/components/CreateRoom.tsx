import { RoomType } from "@/types";
import api from "@/utils/api";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMemo, useState } from "react";
import { API_CREATE_ROOM, TOAST_MESSAGES } from "../../config";
import toast from "react-hot-toast";
import ShowRoomIdModal from "./modals/ShowRoomId";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [roomType, setRoomType] = useState<RoomType | "">("PUBLIC");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  const handle_room_type_change = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: RoomType
  ) => {
    setRoomType(newAlignment ? newAlignment : "");
  };

  const create_room = async () => {
    try {
      setIsCreatingRoom(true);
      const formData = {
        name: roomName.trim(),
        description: roomDescription ? roomDescription.trim() : undefined,
        type: roomType,
      };
      const res = await api.post(API_CREATE_ROOM, formData);

      if (res.status === 201) {
        setRoomId(res.data.roomId);
        setIsModalOpen(true);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.log("Following error while creating room : ", err);
      toast.error(TOAST_MESSAGES.CREATE_ROOM_FAILED, {
        position: "top-center",
      });
    } finally {
      setIsCreatingRoom(false);

      setRoomName("");
      setRoomDescription("");
      setRoomType("PUBLIC");
    }
  };

  const isFormSubmitButtonEnabled = useMemo(() => {
    return roomName.trim().length > 0 && roomType.trim().length > 0;
  }, [roomName, roomType]);

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🏗️ Create Room
        </h2>
        <form className="space-y-4">
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="filled"
              fullWidth
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="filled"
              fullWidth
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
            />
          </div>

          <div className="w-full">
            <ToggleButtonGroup
              color="standard"
              value={roomType}
              exclusive
              onChange={handle_room_type_change}
              aria-label="Room-Type"
              className="w-full flex justify-center"
            >
              <ToggleButton value="PUBLIC" className="grow-1">
                Public
              </ToggleButton>
              <ToggleButton value="PRIVATE" className="grow-1">
                Private
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mt-4 hover:cursor-pointer active:scale-101 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={create_room}
            disabled={!isFormSubmitButtonEnabled || isCreatingRoom}
          >
            {isCreatingRoom ? "Creating ..." : "Create Room"}
          </button>
        </form>
      </div>
      <ShowRoomIdModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roomId={roomId}
      />
    </section>
  );
}

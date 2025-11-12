import { TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  API_TO_GET_ROOM_METADATA,
  APP_ROUTES,
  TOAST_MESSAGES,
} from "../../config";
import api from "@/utils/api";
import { show_toast } from "@/utils/toast";
import { RoomType } from "@/types";

const ROOM_ID_LENGTH = 36;

export default function JoinRoom() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const isFormSubmitButtonEnabled = roomId.trim().length === ROOM_ID_LENGTH;

  const join_room = async () => {
    try {
      setSubmitting(true);
      const res = await api.get(
        `${API_TO_GET_ROOM_METADATA}?room_id=${roomId}`
      );
      const doesRoomExist = res.status === 200;

      if (doesRoomExist) {
        const roomMetadata = res.data.metadata;
        const roomType = roomMetadata.type as RoomType;
        const roomUuid = roomMetadata.uuid;

        if (roomType === "PUBLIC") {
          setRoomId("");
          window.open(`${APP_ROUTES.EDITOR}?room_id=${roomUuid}`, "_blank");
        } else {
          show_toast(TOAST_MESSAGES.PRIVATE_ROOMS_NOT_SUPPORTED, "error");
        }
      }
    } catch (error: any) {
      console.error("Error joining room:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          show_toast(TOAST_MESSAGES.ROOM_DOES_NOT_EXIST, "error");
        } else {
          show_toast(TOAST_MESSAGES.JOIN_ROOM_FAILED, "error");
        }
      } else {
        show_toast(TOAST_MESSAGES.JOIN_ROOM_FAILED, "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🔑 Join Room
        </h2>
        <form className="space-y-4">
          <div>
            <TextField
              id="outlined-basic"
              label="Room ID"
              variant="filled"
              fullWidth
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mt-4 hover:cursor-pointer active:scale-101 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            onClick={join_room}
            disabled={!isFormSubmitButtonEnabled}
          >
            {submitting ? "Joining ..." : "Join Room"}
          </button>
        </form>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = () => {
    const id = uuidV4();
    setRoomId(id);
  };

  const joinRoom = () => {
    if (!roomId || !username) return alert("Room ID and username required!");
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") joinRoom();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white font-sans">
      <div className="backdrop-blur-xl bg-white/5 p-10 rounded-2xl shadow-2xl border border-purple-600 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide text-purple-400 drop-shadow-lg">
          ⚡ CollabAI
        </h1>

        <div className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Room ID"
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleEnter}
          />
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleEnter}
          />

          <button
            onClick={joinRoom}
            className="bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-md text-white font-semibold hover:opacity-90 transition shadow-lg"
          >
            🚀 Join Room
          </button>

          <span className="text-center text-sm text-gray-400">
            or{" "}
            <button
              onClick={createNewRoom}
              className="text-purple-300 hover:underline"
            >
              Generate New Room ID
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;

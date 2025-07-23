import { useEffect, useState } from "react";
import ApiService from "../apis/ApiService";

const avatarOptions = [
  "https://avatarngau.sbs/wp-content/uploads/2025/05/avatar-vo-tri-97.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1r3NxvmM9AMtH9Uw7j0JMU45hgYVVet8Cw&s",
  "https://hoseiki.vn/wp-content/uploads/2025/03/avatar-vo-tri-cute-22.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIzlAaiXcqtgWBRSy174AJcXBLKuKNc01tYg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKvSzQz_DEPoGikcLRllrLh9NOtH9zeuuvA&s",
  "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eUWNSvtwwRaFOsqeh9TfC_fU3C1brW6hyQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymQZ9uPvZBe4vChn-ob5EnqE_pKrqeiNl8Q&s",
  "https://demoda.vn/wp-content/uploads/2022/03/anh-meo-bua-buon-cuoi-lay-loi-cuc-ky-800x600.jpg",
];

const EditProfileModal = ({ onClose }) => {
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        if (!accountId) return;

        const res = await ApiService.callApiAsync("account", "GET");
        const accounts = res?.data?.data || [];

        const currentUser = accounts.find((acc) => acc._id === accountId);

        if (currentUser) {
          setUserData(currentUser);
          setAvatar(currentUser.img || avatarOptions[0]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
      }
    };

    fetchAccount();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (!userData) return;

      const updatedUser = {
        email: userData.email,
        pass: userData.pass,
        success: userData.success,
        user_name: userData.user_name,
        img: avatar, 
      };

      await ApiService.callApiAsync(`account/${userData._id}`, "PUT", updatedUser); 

      alert("Updated profile picture successfully!");
      onClose();
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
      alert("Đã có lỗi xảy ra khi lưu!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-[#1a1f36] w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 relative z-10">
        {userData ? (
          <>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-[#3f1d42] object-cover"
                />
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-0 right-0 bg-orange-500 hover:bg-[#5a49c3] text-white text-xs px-2 py-1 rounded-full"
                >
                  Avatar
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#DDD6F3] text-center">Edit Profile</h2>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="block text-sm text-[#9182B3] mb-1">Username</label>
                <input
                  type="text"
                  value={userData.user_name}
                  disabled
                  className="w-full px-4 py-2 bg-[#252a44] text-[#DDD6F3] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm text-[#9182B3] mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-2 bg-[#252a44] text-[#DDD6F3] rounded-xl"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-gray-300 font-semibold py-2 rounded-xl transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center text-white py-10">Loading user data...</div>
        )}
      </div>

      {/* Avatar picker modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          <div className="bg-[#1a1f36] p-6 rounded-2xl shadow-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-lg text-[#DDD6F3] font-semibold text-center">Chọn ảnh đại diện</h3>
            <div className="grid grid-cols-3 gap-4">
              {avatarOptions.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar ${i + 1}`}
                  onClick={() => {
                    setAvatar(url);
                    setShowModal(false);
                  }}
                  className={`w-20 h-20 rounded-full object-cover cursor-pointer transition ${
                    avatar === url ? "ring-4 ring-[#6C5DD3]" : ""
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="block mx-auto mt-4 px-4 py-1 bg-[#3f1d42] text-white text-sm rounded-xl hover:bg-[#391a3b]"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;

import mongoose from "mongoose";

const UserShema = mongoose.Schema(
     {
          fullName: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          passwordHash: {
               type: String,
               required: true,
          },
          avatarUrl: String,
     },
     {
          //Атоматически прикручивает дату создания и обновления юзера
          timestamps: true
     }
);

export default mongoose.model('User', UserShema);
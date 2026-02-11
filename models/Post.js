import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
     {
          title: {
               type: String,
               required: true,
          },
          text: {
               type: String,
               required: true,
               unique: true,
          },
          tags: {
               type: Array,
               default: []
          },
          viewCount: {
               type: String,
               default: 0
          },
          user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true,
          },
          imageUrl: String,
     },
     {
          //Атоматически прикручивает дату создания и обновления юзера
          timestamps: true
     }
)

export default mongoose.model('Post', PostSchema)
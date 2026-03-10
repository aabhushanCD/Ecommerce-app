import { FaRegStar, FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) =>
      star <= rating ? (
        <FaStar key={star} className="text-amber-400 text-sm" />
      ) : (
        <FaRegStar key={star} className="text-amber-400 text-sm" />
      ),
    )}
  </div>
);

export default StarRating;

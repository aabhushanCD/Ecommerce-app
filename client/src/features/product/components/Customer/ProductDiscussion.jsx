import React from 'react'
import { HiOutlineChatAlt2 } from 'react-icons/hi';

const ProductDiscussion = () => {
  return (
    <div className="max-w-2xl text-center py-12 text-gray-400">
      <HiOutlineChatAlt2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p className="font-semibold text-gray-500">No discussions yet</p>
      <p className="text-sm mt-1">
        Be the first to start a conversation about this product.
      </p>
      <button className="mt-4 bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
        Start Discussion
      </button>
    </div>
  );
}

export default ProductDiscussion
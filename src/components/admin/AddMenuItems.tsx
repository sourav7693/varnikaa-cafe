"use client"

const AddMenuItems = () => {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <select
        name="categoryType"
        id=""
        className="w-full p-2 border border-[#ccc] rounded-md mb-2 text-defined-brown"
      >
        <option value="">Select Category Type</option>
        <option value="Cloud Kitchen Menu">Cloud Kitchen Menu</option>
        <option value="Cafe Menu">Cafe Menu</option>
      </select>
      <input
        type="text"
        placeholder="Category Name"
        className="w-full p-2 border border-[#ccc] rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Item Name"
        className="w-full p-2 border border-[#ccc] rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Item MRP"
        className="w-full p-2 border border-[#ccc] rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Item Discount"
        className="w-full p-2 border border-[#ccc] rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Item Price"
        className="w-full p-2 border border-[#ccc] rounded-md mb-2"
      />
      <textarea
        name="description"
        id=""
        placeholder="Description"
        rows={3}
        className="w-full placeholder:text-defined-brown p-2 border border-[#ccc] rounded-md mb-2"
      ></textarea>
      <input
        type="file"
        name="image"
        id=""
        className="w-full placeholder:text-defined-brown p-2 border border-[#ccc] rounded-md mb-2"
      />
      <button
        type="submit"
        className="w-full bg-defined-darkbrown text-white p-2 rounded-md"
      >
        Add Item
      </button>
    </form>
  );
}

export default AddMenuItems
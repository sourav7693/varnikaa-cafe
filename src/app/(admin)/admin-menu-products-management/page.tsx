import AddMenuItems from '@/components/admin/AddMenuItems';
import React from 'react'

const page = () => {
  return (
    <section className=" flex flex-col md:flex-row justify-between items-center gap-4 py-8 md:px-10 px-4">
      <div className="w-full h-full md:w-[30%] flex flex-col rounded-t-2xl gap-6 bg-[#F9FAFB] border border-[#ccc] p-4">
        <h1 className="text-2xl text-center text-defined-darkbrown font-bold">
          Add Category With Item
        </h1>
        <AddMenuItems />
      </div>
      <div className="w-full md:w-[70%] flex flex-col self-start">
        <h1 className="text-3xl p-4 text-defined-darkbrown font-bold">
          Product Management
        </h1>
        <table>
          <thead className='bg-defined-darkbrown text-white'>
            <tr>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Item Name</th>
              <th className="p-4 text-left">Item MRP</th>
              <th className="p-4 text-left">Item Discount</th>
              <th className="p-4 text-left">Item Price</th>
              <th className="p-4 text-left">Status</th>              
            </tr>
          </thead>          
        </table>
      </div>
    </section>
  );
}

export default page
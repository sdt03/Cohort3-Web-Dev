function MainContent() {
    return  <div className='w-full'>
      <div className='h-72 bg-black hidden md:block'></div>
      <div className='grid grid-cols-11 gap-8 p-8'>
        <div className='h-96 rounded-2xl shadow bg-red-200 md:col-span-2 -translate-y-24 shadow-lg  col-span-11 hidden md:block'>
  
        </div>
        <div className='h-96 rounded-2xl shadow bg-green-200 md:col-span-6 shadow-lg col-span-11'>
  
        </div>
        <div className='h-96 rounded-2xl shadow bg-yellow-200 md:col-span-3 shadow-lg col-span-11'>
  
        </div>
      </div>
    </div>
  }

export default MainContent;
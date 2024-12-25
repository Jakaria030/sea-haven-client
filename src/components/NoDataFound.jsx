import noDataFound from '../assets/animations/no-data.gif';

const NoDataFound = () => {
    return (
        <div className='max-w-8xl mx-auto border-2 rounded-md my-10 py-10 sm:my-20 sm:p-20 bg-white'>
            <img className='size-40 sm:size-52 mx-auto' src={noDataFound} alt="Gif Image" />
            <h1 className='text-2xl font-semibold font-poppins text-center text-[#4A4A4A]'>No Data Found!</h1>
        </div>
    );
};

export default NoDataFound;
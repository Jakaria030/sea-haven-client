
const TitleBanner = ({ title }) => {
    return (
        <section className='bg-primary py-8'>
            <h1 className='text-2xl font-semibold text-white text-center uppercase drop-shadow-md'>{title}</h1>
        </section>
    );
};

export default TitleBanner;
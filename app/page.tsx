import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <main className='text-3xl font-semibold text-black'>
        <h1>Welcome to the issue tracker</h1>
      </main>
      <Pagination
        pageSize={10}
        itemCount={100}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}

const loading = () => {
  return (
    <main className="w-full container mx-auto mb-6 sm:px-3 -mt-14 sm:mt-0 ">
      <section className="grid sm:grid-cols-[280px_auto] sm:grid-flow-col sm:mt-4 sm:mx-4">
        <div className="sm:w-[280px] aspect-square sm:aspect-[9/14] w-full rounded-2xl overflow-hidden -z-10 animate-loading"></div>

        <div className="px-4 pt-4 sm:ml-4 sm:mt-4 bg-black -mt-10 rounded-t-3xl">
          <h1 className="w-full h-10 animate-loading rounded-2xl"></h1>

          <p className="animate-loading mt-3 h-3 w-full rounded-2xl"></p>
          <p className="animate-loading mt-1 h-3 w-full rounded-2xl"></p>
          <p className="animate-loading mt-1 h-3 w-full rounded-2xl"></p>

          <p className="animate-loading mt-1 h-3 w-3/4 rounded-2xl"></p>

          <div className="flex gap-2 mt-6">
            <div className="bg-neutral-800 rounded-full h-6 w-20 animate-loading"></div>
            <div className="bg-neutral-800 rounded-full h-6 w-24 animate-loading"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default loading;

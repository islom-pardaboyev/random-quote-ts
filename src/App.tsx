import { useEffect, useState } from "react";
import { useAxios } from "./hook/useAxios";
import { Quote } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<null | Quote[]>([]);
  const [getAnotherQuote, setGetAnotherQuote] = useState<boolean>(false);
  const axiosInstance = useAxios();

  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("quotes?category=happiness");
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi(); 
  }, [getAnotherQuote]);

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-[#2e2e2e]">
        <h1 className="text-5xl font-bold absolute top-16 left-1/2 -translate-x-1/2 text-white">Random Quotes</h1>
      <div className="w-[50vw] pt-[60px] pb-[30px] px-9 rounded-xl bg-white">
        {isLoading ? (
          <div className="text-center text-xl py-10">Loading...</div>
        ) : (
          quotes?.map((item) => (
            <article className="flex flex-col mb-6" key={item.category}>
              <h1 className="font-bold text-2xl">{item.quote}</h1>
              <p className="text-end mt-4">-{item.author}</p>
            </article>
          ))
        )}
        <button
          className="font-bold rounded-md hover:opacity-70 flex mx-auto px-14 py-3 bg-[#17c6f2]"
          onClick={() => setGetAnotherQuote(!getAnotherQuote)}
        >
          New
        </button>
      </div>
    </section>
  );
}

export default App;
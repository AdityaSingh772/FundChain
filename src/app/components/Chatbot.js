import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the URL to match your Next.js API route
      const res = await axios.post('/api/predict', { prompt: `${input} - answer this with respect to startups, funding, decentralised, crowdfunding only. If the question above is personal or off topic, just answer, Please ask the problem in my domain` });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse('Error: Could not get response from server.');
    }
  };

  return (
    <div className="flex flex-col items-center font-roboto justify-center h-[80vh] bg-gray-100 p-4">
      <div className="bg-b2 w-[30vw] h-[70vh] rounded-lg shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center font-sans">Ask AI where to Fund</h1>
        <form onSubmit={handleSubmit} className="mb-4 mx-auto w-5/6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about Funding , Investment and Decentrilization..."
            rows={4}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-b1 bg-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-b1 text-white p-2 rounded-lg hover:bg-b2 focus:outline-none focus:ring-2 focus:ring-b1"
          >
            Submit
          </button>
        </form>
        <div className="p-4 w-[25vw] rounded-lg shadow-lg h-[35vh] flex flex-col m-auto bg-gray-100 focus:ring-b1">
          <h2 className="text-xl font-semibold mb-2">Response:</h2>
          <div className="overflow-scroll scroll-smooth">
            <p className="text-gray-800">{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

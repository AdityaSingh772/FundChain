import Image from "next/image";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";

export default function Home() {
  return (
        <div className="bg-slate-600 h-[100vh] w-full">
            <Navbar/>
            <div className="h-[60vh] w-[80vw] mx-auto my-8">
            <CampaignList/>
            </div>
        </div>
  );
}

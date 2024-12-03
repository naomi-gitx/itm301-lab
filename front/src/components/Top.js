import { Link } from "react-router-dom";
const Top = () => {
    return (
        <div className="bg-primary h-[100px] flex justify-between items-center px-4">
            <div className="text-white font-semibold">Нүүр хуудас</div>
            <div>
                <Link to='/authenticate' className="bg-accent-light text-black px-4 py-1 rounded hover:bg-accent-dark hover:text-white transition">
                    Нэвтрэх
                </Link>
            </div>
        </div>
    );
};

export default Top;

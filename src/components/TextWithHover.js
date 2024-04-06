import { useNavigate } from 'react-router-dom';
const TextWithHover = ({displayText, active,path}) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-start cursor-pointer">
            <div
            onClick={()=>{
                if(path){
                    navigate(path)
                }
            }}
                className={`${
                    active ? "text-white" : "text-gray-500"
                } font-semibold hover:text-white`}>
                {displayText}
            </div>
        </div>
    );
};

export default TextWithHover;
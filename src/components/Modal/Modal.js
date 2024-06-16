import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modalSlice";
import cancelIcon from "../../static/icon/icons8-cancel-black.png";

const Modal = ({ content, heading }) => {
  const displayModal = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        displayModal ? "flex" : "hidden"
      } fixed top-0 bottom-0 left-0 right-0 bg-[rgba(26,44,82,0.13)] z-50`}
      onClick={() => dispatch(closeModal())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-[37rem] rounded-xl m-auto max-h-[90vh] overflow-auto p-4"
      >
        <div className={`flex gap-3 items-center ${heading? "justify-between" : "justify-end"}`}>
            {heading && <h1 className="text-2xl font-bold font-[montserrat]">{heading}</h1>}
          <img
            src={cancelIcon}
            alt="cancel"
            className="w-5 h-auto"
            onClick={() => dispatch(closeModal())}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;

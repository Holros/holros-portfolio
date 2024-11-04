import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { motion } from "framer-motion";

const Freestyle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("FREESTYLE"));
  }, [dispatch]);
  
  return (
      <motion.div
        className="flex items-center justify-center p-3 text-2xl border border-red-500"
        initial={{ opacity: 0, y: 30 }}
        whileHover={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Hi
      </motion.div>
  );
};

export default Freestyle;

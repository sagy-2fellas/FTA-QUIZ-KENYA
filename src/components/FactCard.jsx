import Link from "next/link";
import { motion } from "framer-motion";

const FactCard = ({ children, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", delay: 0.5 }}
      className="max-w-[230px] md:max-w-xs lg:max-w-[290px] bg-white p-4 shadow-xl z-10"
    >
      <div className="mb-4">{children}</div>
    </motion.div>
  );
};

export default FactCard;

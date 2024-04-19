"use client";
import ActionMenu from "@/components/ActionMenu";

const Action = ({ productId }) => {
  const handleUpdate = () => {
    console.log(productId);
  };
  const handleDelete = () => {
    console.log(productId);
  };
  return <ActionMenu handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default Action;

"use client";
import Button from "@/components/Button";
import revalidate from "@/lib/actions/revalidation";
import { AiOutlineReload } from "react-icons/ai";
import Alert from "@/lib/config/alert.config";
import cn from "@/lib/utils/cn";
import { useState } from "react";

const ReloadButton = ({ revalidatePath }) => {
  const [spinner, setSpinner] = useState(false);

  const handleRefatch = async () => {
    try {
      setSpinner(true);
      await revalidate(revalidatePath);
      // eslint-disable-next-line no-undef
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      Alert.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setSpinner(false);
    }
  };
  return (
    <Button
      onClick={handleRefatch}
      variant="confirm"
      shape="icon-button"
      title="Reload data"
      disabled={spinner}
    >
      <span className={cn("block", spinner && "animate-spin")}>
        <AiOutlineReload />
      </span>
    </Button>
  );
};

export default ReloadButton;

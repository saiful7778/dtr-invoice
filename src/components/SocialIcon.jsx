import Link from "next/link";

const SocialIcon = ({ href, children }) => {
  return (
    <Link className="text-accent" href={href} target="_blank">
      {children}
    </Link>
  );
};

export default SocialIcon;

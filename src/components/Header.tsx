type PropsTypes = {
  title: string;
  design?: string;
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function Header(props: PropsTypes) {
  const { title, design, Tag } = props;
  return <Tag className={design}>{title}</Tag>;
}

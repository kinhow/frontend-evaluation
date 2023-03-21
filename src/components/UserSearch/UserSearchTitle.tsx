interface UserSearchTitleProps {
  title: string;
}

const UserSearchTitle = ({ title }: UserSearchTitleProps) => {
  return <div className="text-neutrals-300 text-sm bg-neutrals-100 p-2">{title}</div>;
};

export default UserSearchTitle;

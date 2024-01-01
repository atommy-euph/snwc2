const Input = ({ ...props }) => {
  return (
    <input
      className="outline-none border-2 border-white border-dashed  hover:border-slate-300 px-2 py-1"
      {...props}
    />
  );
};

export default Input;

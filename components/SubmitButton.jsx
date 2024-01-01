const SubmitButton = ({ children, ...props }) => {
  return (
    <>
      <div className="h-5"></div>
      <button
        className="border-2 font-bold text-black border-black mt-12 px-4 py-2"
        type="submit"
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default SubmitButton;

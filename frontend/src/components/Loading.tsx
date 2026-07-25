interface LoadingProps {
  text?: string;
}

const Loading = ({ text = "Đang tải dữ liệu..." }: LoadingProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

export default Loading;

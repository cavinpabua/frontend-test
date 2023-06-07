import { Space } from "antd";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-sm space-y-5">
          <div className="full-w text-center">
            <Space direction="horizontal" className="full-w">
              <Image
                className="w-auto h-32 mx-auto"
                src="/zombie.gif"
                alt="Survival Nexus Logo"
                width={100}
                height={100}
              />
              <span className="text-3xl font-extrabold text-gray-900 text-gray-100 animate-pulse">
                Crunching brains...
              </span>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

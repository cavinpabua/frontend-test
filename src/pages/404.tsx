import { Typography } from "antd";
import Link from "next/link";
import { FC } from "react";

import Meta from "@/components/Shared/Meta";
import Image from "next/image";

const { Title } = Typography;

const Error: FC = () => {
  return (
    <>
      <Meta
        title="Not Found - Diglot"
        description="A place where you can learn and have fun!"
        image="/preview.jpg"
      />
      <div className="flex justify-center items-center h-screen">
        <div className="border-solid border-gray-300 rounded-lg p-6 min-w-[300px]">
          <Image
            src="/zombie.gif"
            alt="Icon"
            className="text-center mx-auto block"
            width={100}
            height={100}
          />
          <Title level={3} className="text-center">
            404 - Not Found
          </Title>
          <p className="text-center">
            The page you are looking for does not exist.{" "}
            <Link href={"/dashboard"}>Go back to home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;

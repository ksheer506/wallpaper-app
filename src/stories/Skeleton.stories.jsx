import ImgContainer from "./ImageContainer";
import Skeleton, { Circle, ImageSkel, Rectangle } from "./Skeleton";

export default {
  title: "Wallpaper/Skeleton",
  component: Skeleton,
};

const Template = (args) => <Skeleton {...args} />;

export const RectangleSkel = Template.bind({});
RectangleSkel.args = {
  width: 300,
  height: 300,
  children: <Rectangle width={160} height={30} />,
};

export const CircleSkel = Template.bind({});
CircleSkel.args = {
  width: 300,
  height: 300,
  children: <Circle radius={40} />,
};

export const Image = Template.bind({});
Image.args = {
  width: 300,
  height: 300,
  children: <ImageSkel />,
};

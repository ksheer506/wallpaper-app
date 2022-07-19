import Loading from "./Loading";

export default {
  title: "Wallpaper/Loading",
  component: Loading,
};

const Template = (args) => <Loading {...args} />;

export const Colors = Template.bind({});
Colors.args = {
  colors: ["#42a6f8", "#edf056", "#f88461"],
};

export const Monochrome = Template.bind({});
Monochrome.args = {
  colors: ["#fa8d8d", "#fa8d8d", "#fa8d8d"],
};

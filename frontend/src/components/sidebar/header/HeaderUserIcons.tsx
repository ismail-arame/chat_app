import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "@/app/svg";

type Props = {};

export default function HeaderUserIcons({}: Props) {
  return (
    <ul className="flex items-center gap-x-2.5">
      <li>
        <button className="btn">
          <CommunityIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li>
        <button className="btn">
          <StoryIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li>
        <button className="btn">
          <ChatIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li>
        <button className="btn">
          <DotsIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
    </ul>
  );
}

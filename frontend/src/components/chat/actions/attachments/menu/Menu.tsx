import {
  CameraIcon,
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "@/app/svg";
import PhotoAttachement from "./PhotoAttachement";
import DocumentAttachement from "./DocumentAttachement";

type Props = {};

export default function Menu({}: Props) {
  return (
    <ul className="openEmojiAnimation absolute bottom-14">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full bg-[#0EABF4]">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachement />
      <li>
        <button type="button" className="rounded-full bg-[#D3396D]">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachement />
    </ul>
  );
}

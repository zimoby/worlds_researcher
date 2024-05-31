import { ModalWrapper } from "./templateComponents";

export const AboutModal = () => {
  return (
    <ModalWrapper title="About" modalName="showAboutModal">
      <div className="w-full h-full flex flex-col p-7 pt-4 text-uitext leading-5 space-y-2">
        <div className="text-sm">
          <p>
            This game, created for the challenge &quot;Futuristic UI&quot; from
            Bruno Simon&apos;s{" "}
          </p>
          <a
            className="underline"
            href="https://threejs-journey.com"
            target="_blank"
            rel="noreferrer"
          >
            Three.js Journey
          </a>
          <p>course, focuses on gathering resources on unknown planets.</p>
        </div>
        <p className="">
          <a
            className="underline"
            href="https://github.com/zimoby/resource_gathering_v1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <p className="text-sm">
          The game is being developed by Denys Bondartsov.
        </p>
        <div className=" flex flex-row space-x-3">
          <a
            className="underline"
            href="https://zimoby.notion.site/"
            target="_blank"
            rel="noreferrer"
          >
            Notion
          </a>
          <a> | </a>
          <a
            className="underline"
            href="https://www.instagram.com/zimoby/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a> | </a>
          <a
            className="underline"
            href="https://x.com/ZimOby"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
};

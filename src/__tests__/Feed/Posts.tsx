import { screen } from "@testing-library/react";
import { renderLayout } from "../../Utils/tests";
import Post from "../../components/Feed/Post";
import { Post as ModelPost } from "../../Utils/models";

test("display post", () => {
  const {
    avatar,
    date,
    description,
    photo,
    author,
    id,
    authorId,
    likes,
    usersWhoLiked,
    comments,
  }: ModelPost = {
    avatar: undefined,
    date: `${new Date().toISOString()}`,
    description: "fakeDesc",
    photo: undefined,
    author: "fakeAuthor",
    id: "fakeId",
    authorId: "fakeAuthorId",
  };

  renderLayout({
    ui: (
      <Post
        key={id}
        avatar={avatar}
        date={date}
        description={description}
        photo={photo}
        author={author}
        id={id}
        authorId={authorId}
        likes={likes}
        usersWhoLiked={usersWhoLiked}
        comments={comments}
      />
    ),
  });

  expect(screen.getByRole("link")).toHaveTextContent(`@${author}`);

  expect(
    screen.getByRole("heading", { name: /a few seconds ago/i, level: 6 })
  ).toBeInTheDocument();

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    description
  );

  expect(
    screen.getByRole("button", { name: /open comments/i })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(/comments counter/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/likes counter/i)).toBeInTheDocument();
});

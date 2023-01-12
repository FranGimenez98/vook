import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  CommentsContextProvider,
  CommentsContext,
} from "../context/CommentsContext";
import { useContext } from "react";
import { LikesContext, LikesContextProvider } from "../context/LikesContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { comments } = useContext(CommentsContext);
  const { likes } = useContext(LikesContext);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <LikesContextProvider value={likes}>
          <CommentsContextProvider value={comments}>
            <Component {...pageProps} />
          </CommentsContextProvider>
        </LikesContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

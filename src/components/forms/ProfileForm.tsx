import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { ProfileValidation } from "@/lib/validation";
import { Models } from "appwrite";
import {
  useCreatePost,
  useUpdatePost,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";
import { updateUser } from "@/lib/appwrite/api";
import { useState } from "react";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const ProfileForm = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext();
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");

  const { mutateAsync: IUpdatUser, isPending: isLoadingUpdate } =
    useUpdateUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: "",
      username: "",
      file: [],
      email: "",
      bio: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    if (action === "Update") {
      // @ts-ignore
      const updatedUser = await IUpdatUser({
        ...values,
        name:  name,
        username:  username,
        email:  email,
        userId: user.id,
        imageId: user?.imageId,
        imageUrl: user?.imageUrl,
        bio: bio,
      });
      if (!updatedUser) {
        toast({
          title: "Please try again.",
        });
      }
      return navigate("/");
    }
  }

  // const handlePreviousRoute = () => {
  //   return navigate(-1);
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"></FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={user?.imageUrl}
                  profile={true}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
                  {...field}
                  className="shad-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="shad-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  {...field}
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your self"
                  {...field}
                  className="shad-textarea custom-scrollbar"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && <Loader />}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;

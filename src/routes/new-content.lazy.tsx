import { useState, type ChangeEvent, type FormEvent } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import ButtonDropdown from '../ui/ButtonDropdown';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';

export const Route = createLazyFileRoute('/new-content')({
  component: NewContent,
})

const contentTypes = [
  "Anime",
  "Manga",
  "Manhwa",
]

function NewContent() {
  const [contentTypeDropdownHidden, setContentTypeDropdownHidden] = useState(true);
  const [selectedContentType, setSelectedContentType] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  function handleContentTypeDropdownSelection(value: string) {
    setSelectedContentType(value);
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleContentTypeDropdownToggle() {
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleNameOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setName(val);
  }

  function handleImageUrlOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setImageUrl(val);
  }

  function handleDescriptionOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setDescription(val);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    console.log(`Name: ${formData.get("name")}`);
    console.log(`Image Url: ${formData.get("image")}`);
    console.log(`Description: ${formData.get("description")}`);
  }

  return (
    <>
      <div className={`py-4`}>
        <form onSubmit={handleFormSubmit}>
          <div className={`flex flex-col flex-nowrap p-4 gap-4`}>
            <div>
              <ButtonDropdown
                Name={`Content Type`}
                DropdownHidden={contentTypeDropdownHidden}
                SelectedValue={selectedContentType}
                OnClick={handleContentTypeDropdownToggle}
                OnSelect={handleContentTypeDropdownSelection}
                Options={contentTypes}
              />
            </div>
            <div>
              <Input
                Id="name"
                Type="text"
                Value={name}
                Label="Name"
                Required={true}
                OnChange={handleNameOnChange}
              />
            </div>
            <div>
              <Input
                Id="image"
                Type="url"
                Value={imageUrl}
                Label="Image Url"
                Required={true}
                OnChange={handleImageUrlOnChange}
              />
            </div>
            <div>
              <TextArea
                Id="description"
                Value={description}
                Label="Description"
                Required={true}
                OnChange={handleDescriptionOnChange}
              />
            </div>
            <div>
              <Card
                Title={name}
                Episode={1}
                ContentLink=""
                Description={description}
                ImageSrc={imageUrl}
              />
            </div>
            <div>
              <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Create Entry</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

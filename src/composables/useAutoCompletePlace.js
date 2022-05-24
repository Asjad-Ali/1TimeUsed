import { ref } from "firebase/storage";
import { reactive } from "vue";

export default function useAutoCompletePlaces() {
  let place = reactive({})
  const options = {
    //bounds: defaultBounds,
    componentRestrictions: { country: "pk" },
    fields: ["geometry", "formatted_address", "name"],
    strictBounds: false,
    types: ["geocode"],
  };

  const initializeAutoComplete = (input, options) => {
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    console.log("autocomplete", autocomplete);
    autocomplete.addListener("place_changed", () => {
      place = autocomplete.getPlace();
      console.log("place", place);
    });
    return place
  }

  return {
    initializeAutoComplete
  }


}

import {DEFAULT_PATH} from "@/core/config/Path.constants.tsx";

class RouterUrlHelper {
    public static urlMap = {
        home: `${DEFAULT_PATH}`,
        projectGallery: `/project-gallery`,
        pageNotFound: `/page-not-found`,
    }
}

export default RouterUrlHelper
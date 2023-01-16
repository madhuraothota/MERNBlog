const validateBlogData = (blogPost) => {
        //title validatio

       if(!blogPost.title) {
                return "title is requried";
       }

       if(typeof blogPost.title != "string") {
         return "Title should be string type";
       }

       if(blogPost.title && blogPost.title.length< 5) {
        return "Title should be at least 5 characters";
      }

      //description validation
       if(!blogPost.description) {
        return "Description is required";
       }
       
       if(typeof blogPost.description !== "string") {
        return "Description should be string type";
       }

       if(blogPost.description && blogPost.description.length < 10) {
        return "Description should be at least 10 characters";
       }

       //markdown validation
       if(!blogPost.markdown) {
        return "Markdown is requried";
       }

       if(typeof blogPost.markdown !== "string") {
        return "Markdown should be string type";
       }

       if(blogPost.markdown && blogPost.markdown.split(" ").length < 15){
        return "Markdown shoulde be at least 15 words";
       }

        return null;
}

module.exports = { validateBlogData };
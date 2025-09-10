// JavaScript Document
const data ={
	currentUser:{
		image:{
			png:"Fragezeichen.png",
		},
		username: "nele",
	},
	comments: [
		{
			parent: 0,
			id: 1,
			content: "test",
			createdAt: "Vor 1 Monaten",
			user:{
				image: {
					png:"Fragezeichen.png",
				},
				username: "cara",
			},
			replies: [],
		},
		{
			parent: 0,
			id: 2,
			content: "Obacht! Achtung!",
			created: "Vor 2 Wochen",
			score: 5,
			user:{
				image: {
					png:"Fragezeichen.png",				
				},
				username: "JustusJonas",
			},
			replies: [
				{
					parent: 2,
					id: 1,
					content: "yippie",
					createdAt: "Vor 1 Wochen",
					score: 4,
					replyingTo: "JustusJonas",
					user: {
						image: {
							
							png:"Fragezeichen.png",
						},
						username:"PeterShaw",
					},
				},
				{
					parent: 2,
					id: 1,
					content: "Den schnappst du dir",
					createdAt: "Vor 5 Tagen",
					score: 2,
					replyingTo: "PeterShaw",
					user:{
						image: {
							png:"Fragezeichen.png",
						},
						username: "Bobby",
					},
				},
			],
		},
	],
};
	  
	  
	  
	  
	  function appendFrag(frag, parent){
		  let children = [].slice.call(frag.childNodes, 0);
		  parent.appendChild(frag);
		  return children[0]
	  }
const addComment=(body, parentId, replyTo=undefined)=> {
	let commentParent=parentId===0?data.comments.filter((c)=<c.id==parentId)[0].replies;
	let newComment = {
	parent: parentId,
		id: commentParent.length == 0 ? 1 : [commentParent.length - 1].id + 1,
			content: body,
				createdAt:"Now",
					peplyingTo: replyTo,
						score: 0,
							replies:parent==0?[]:undefined,
								user:data.currentUser,
	}
								commentParent.push(newComment);
	initComments()
}
const deleteComment = (commentObject) => {
if (commentObject.parent == 0){
	data.comments = data.comments.filter((e)=>e!= commentObjects);
} else {
	data.comments.filter((e)=>e.id===commentObject.parent)[0].replies=data.comments.filter((e)=>e.id==commentObject.parent)[0].replies.filter((e)=>e!=commentObject);
}
	initComments()
}

const promptDel=(commentObject)=>{
	const modalWrp = document.querySelector(".modal-wrp");
	modalWrp.classList.remove("invisible");
	modalWrp.querySelector("Ja").addEventListener("click", () => {
		deleteComment(commentObject);
		modalWrp.classList.add("invisible");
	})
}

const spawnReplyInput=(parent,parentId,replyTo = undefined) => {
	if (parent.querySelectorAll(".reply-input")){
		parent.querySelectorAll(".reply-input").forEach((e) => {
			e.remove()
		})
	}
}

const inputTemplate=document.querySelector(".reply-input-template");
const inputNode= inputTemplate.content.cloneNode(true);
const addedInput = appendFrag(inputNode, parent);
addedInput.querySelector("bu-primary").addEventListener("click", () => {
	let commentBody=addedInput.querySelector("cmnt.input").value;
	if(commentBody.length==0) return;
	addComment(commentBody,parentId,replyTo)
})

const createCommentNode = (commentObject) => {
	let commentNode=commentTemplate.content.cloneNode(true);
	commentNode.querySelector(".usr-name").textContent = commentObject.user.username;
	commentNode.querySelector(".usr-img").src = commentObject.user.image.webp;
	commentNode.querySelector(".score-number").textContent = commentObject.score;
	commentNode.querySelector(".cmnt-at").textContent = commentObject.createdAt;
	commentNode.querySelector(".c-body").textContent = commentObject.content;
	if (commentObject.replyingTo){
		commentNode.querySelector(".reply-to").textContent = "@" + commentObject.replyingTo;
		commentNode.querySelector(".score-plus").addEventListener("click", () => {
			commentObject.score++;
			initComments();
		})
		commentNode.querySelector(".score-minus").addEventListener("click", () => {
			commentObject.score--;
			if (commentObject.score < 0) commentObject.score = 0;
			   initComments()
		})
		if (commentObject.user.username == data.currentUser.username){
			commentNode.querySelector(".comment").classList.add("this-user");
			commentNode.querySelector(".delete").addEventListener("click", () => {
				promptDel(commentObject)
			})
			commentNode.querySelector(".edit").addEventListener("click", (e) => {
				const pat=e.path[3].querySelector(".c-body");
				if (path.getAttribute("contenteditable") == false || path.getAttribute("contenteditable") == null){
					path.setAttribute("contenteditable", true);
					path.focus()
				} else {
					path.removeAttribute("contenteditable")
				};
			});
			return commentNode;
		};
	
	} return commentNode;
};
const appendComment =(parentNode,parentId) => {
	const bu_reply = commentNode.querySelector(".reply");
	const appendedCmnt = appendFrag(commentNode, parentNode);
	const replyTo = appendedCmnt.querySelector(".usr-name").textContent;
	bu_reply.addEventListener("click", () => {
		if (parentNode.classList.containes ("replies")){
			spawnReplyInput (parentNode, parentId, replyTo)
			
		};
		else {
			spawnReplyInput(appendedCmnt.querySelector(".replies"), parentId,replyTo)
		};
	});
};

function initComments(commentList = data.comments, parent = document.querySelector(".comment-wrp")){
	parent.innerHTML = "";
	commentList.forEach((element) => {
		let parentId=element.parent==0?element.id:element.parent;
		const comment_node = createCommentNode(element);
		if (element.replies && element.replies.length > 0){
			initComments(element.replies, comment_node.querySelector(".replies"));
		};
		appendComment(parent, comment_node,parentId)
	});
};

initComments();
const cmntInput = document.querySelector(".reply-input");
cmntInput.querySelector(".bu-primary").addEventListener("click", () =>{
	let commentBody = cmntInput.querySelector(".cmnt-Input").value;
	if (commentBody.length == 0) return;
	addComment (commendBody, 0);
	cmntInput.querySelector(".cmnt-input").value = "";
});
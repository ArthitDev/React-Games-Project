<div>
            <Text mt="4" fontWeight="bold" color="gray.500">
              ความคิดเห็น :
            </Text>
            <ul
              style={{
                listStyleType: "none",
                paddingInlineStart: 0,
                color: "slategray",
              }}
            >
              {selectedGame?.comment.map((comment, index) => (
                <li key={index} style={{ textIndent: "1em" }} color="gray.500">
                  - {comment.comment_text} : คะแนน {comment.vote}
                </li>
              ))}
            </ul>
          </div>
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [copied, setCopied] = useState(false)
    const pathName = usePathname()

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 1000)
    }

    return (
        <div className="prompt_card">
            <div className="flex items-start gap-5">
                <div className="flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-grap-900">
                        {post.creator.username}
                    </h3>
                    <p className="font-inter text-sm text-gray-500">
                        {post.creator.email}
                    </p>
                </div>
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={
                            copied === post.prompt
                                ? 'assets/icons/icon.svg'
                                : 'assets/icons/copy.svg'
                        }
                        width={12}
                        height={12}
                        alt="copy"
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag.split(' ').join(' #')}
            </p>
            {session?.user.id === post.creator._id &&
                pathName === '/profile' && (
                    <div className="mt-5 flex justify-between border-t border-gray-200 pt-3">
                        <p
                            className="font-inter text-sm green_gradient cursor-pointer"
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p
                            className="font-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    )
}

export default PromptCard

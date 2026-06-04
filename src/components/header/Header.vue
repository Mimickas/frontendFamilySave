<template>
    <div class="bg-[var(--bg)] shadow-md p-5 px-20">
        
        <div class="flex items-center justify-between">

            <div class="flex items-center font-heavy text-2xl text-[var(--color-full-spectrum-blue-500)]">
                <font-awesome-icon icon="money-check" />
                <span>
                    FS
                </span>
            </div>

            <div class="flex items-center">
                <ul class="flex gap-6 font-reg text-[var(--text-secondary)]">
                    <li class="hover: cursor-pointer">Home</li>
                    <li class="hover: cursor-pointer">About</li>
                    <li class="hover: cursor-pointer">Contact</li>
                    <li class="hover: cursor-pointer">Archive</li>
                </ul>
            </div>
            <div class="flex items-center">
                <ul class="flex gap-4 font-reg font-md">
                    <li>
                        <button class="shadow-sm rounded-lg py-3 px-4 text-[var(--text-primary)] hover:shadow-xs transition-all duration-200 ease-in-out cursor-pointer">
                            Sign in
                        </button>
                    </li>
                    <li>
                       <button 
                            class="
                                bg-[var(--color-full-spectrum-blue-500)] 
                                text-[var(--color-full-spectrum-blue-50)] 
                                rounded-lg py-3 px-10
                                hover:bg-[var(--color-full-spectrum-blue-400)]
                                active:bg-[var(--color-full-spectrum-blue-600)]
                                active:scale-95
                                transition-all duration-200 ease-in-out
                                cursor-pointer
                            "
                        >
                            Sign up
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
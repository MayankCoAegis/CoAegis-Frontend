

export default function DangerSettings(){
    return <div class="text-white p-6 max-w-xl mx-auto space-y-6">
  

  {/* <!-- Delete Chat History --> */}
  <div class="flex flex-col md:flex-row gap-4 md:gap-2 md:items-center justify-between">
    <div className="md:w-3/5">
    <p class="!text-red-300 !text-sm !font-semibold">Delete All Chat History</p>
    <p class="!text-gray-300 !text-xs">Permanently delete all your chat conversations</p>
    </div>
    <div>
    <button class="!text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition duration-200">
      Delete History
    </button>
    </div>
  </div>

  <hr class="border-gray-700" />

  {/* <!-- Delete Account --> */}
  <div class="flex flex-col md:flex-row gap-4 md:gap-2 md:items-center justify-between">
    <div className="md:w-3/5">
    <p class="text-red-300 !text-sm font-semibold">Delete Account</p>
    <p class="text-gray-300 !text-xs">Permanently delete your CoAegis account</p>
    </div>
    <div>
    <button class="!text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition duration-200">
      Delete Account
    </button>
    </div>
  </div>
</div>

}
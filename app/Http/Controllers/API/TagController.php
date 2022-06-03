<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Models\Tag;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTagRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(StoreTagRequest $request): JsonResponse
    {
        $data = $request->safe()->only(['project_id','title','description']);

        $this->authorize('create', [Tag::class, $data['project_id']]);

        $tag = Tag::create($data);

        if(!$tag){
            $res = [
                'success' => false,
                'message'=>'Tag could not be created.'
            ];

            $status = 500;
        }
        else{
            $res = [
                'success' => true,
                'tag'=>$tag
            ];
            $status = 201;
        }

        return response()->json($res, $status);
    }

    /**
     * Remove the tag from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy($id): JsonResponse
    {
        try {
            $tag= Tag::findOrFail($id);

            $this->authorize('delete', $tag);

            if($tag->delete()) {
                return response()->json(['success' => true, 'message' => 'Tag deleted.'], 200);
            }
            else {
                return response()->json(['success'=>false,'message' => 'Tag could not be deleted. Cause unknown.'], 500);
            }
        }
        catch(\Exception $e){
            return response()->json(['success'=>false,'message' => 'Tag could not be found.'], 404);
        }

    }
}
